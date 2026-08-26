const express = require("express");

const router = express.Router();
const users = require("../Models/users");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Token inválido ou expirado
 */
router.get("/profile", auth, async (req, res) => {
    res.json({
        message: "Você está autenticada!",
        user: req.user
    });
});

/**
 * @swagger
 * /profile/change:
 *   patch:
 *     summary: Atualiza o usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar perfil
 */
router.patch("/profile/change", auth, async (req, res) => { 
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios"
            });
        }

        const userChange = await users.findByIdAndUpdate(
            req.user.userId,
            { name, email },
            { new: true }
        ).select("-senha");

        if (!userChange) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: userChange
        });

    } catch (err) {
        console.error("Erro ao atualizar nome:", err);

        res.status(500).json({
            error: "Erro ao atualizar perfil"
        });
    }
});

/**
 * @swagger
 * /profile/password:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       500:
 *         description: Erro ao mudar senha
 */
router.patch("/profile/password", auth, async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({
                error: "A senha atual e a nova senha são obrigatórias"
            });
        }

        const user = await users.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        const senhaValida = await bcrypt.compare(
            senhaAtual,
            user.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                error: "Senha atual incorreta"
            });
        }

        const novaSenhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        user.senha = novaSenhaHash;

        await user.save();

        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao atualizar senha:", err);

        res.status(500).json({
            error: "Erro ao atualizar senha"
        });
    }
});


/**
 * @swagger
 * /profile/forgot-password:
 *   post:
 *     summary: Solicita recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitação processada
 *       400:
 *         description: E-mail obrigatório
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao solicitar recuperação
 */
router.post("/profile/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "O e-mail é obrigatório"
            });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        // Gera um token aleatório
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Salva o token no banco
        user.resetPasswordToken = resetToken;

        // Token válido por 15 minutos
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        res.status(200).json({
            message: "Token de recuperação gerado com sucesso",
            resetToken: resetToken
        });

    } catch (err) {
        console.error("Erro ao solicitar recuperação:", err);

        res.status(500).json({
            error: "Erro ao solicitar recuperação de senha"
        });
    }
});


/**
 * @swagger
 * /profile/reset-password:
 *   patch:
 *     summary: Redefine a senha usando um token de recuperação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao atualizar senha
 */
router.patch("/profile/reset-password", async (req, res) => {
    try {
        const { token, novaSenha } = req.body;

        if (!token || !novaSenha) {
            return res.status(400).json({
                error: "O token e a nova senha são obrigatórios"
            });
        }

        const user = await users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                error: "Token inválido ou expirado"
            });
        }

        const novaSenhaHash = await bcrypt.hash(
            novaSenha,
            10
        );

        user.senha = novaSenhaHash;

        // Invalida o token depois de usar
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        });

    } catch (err) {
        console.error("Erro ao atualizar senha:", err);

        res.status(500).json({
            error: "Erro ao atualizar senha"
        });
    }
});



module.exports = router;

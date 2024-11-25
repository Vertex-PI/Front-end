const express = require("express");
const request = require("supertest");
const sinon = require("sinon");
const router = require("../routes/usuarios");
const usuarioController = require("../controllers/usuarioController");

describe("Usuarios Routes", () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use("/usuarios", router);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should call cadastrar on POST /usuarios/cadastrar", async () => {
        const cadastrarStub = sinon.stub(usuarioController, "cadastrar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).post("/usuarios/cadastrar").send({});

        expect(cadastrarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call autenticar on POST /usuarios/autenticar", async () => {
        const autenticarStub = sinon.stub(usuarioController, "autenticar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).post("/usuarios/autenticar").send({});

        expect(autenticarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call editar on PUT /usuarios/editar/:idUsuario", async () => {
        const editarStub = sinon.stub(usuarioController, "editar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).put("/usuarios/editar/1").send({});

        expect(editarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call editarSenha on PUT /usuarios/editarSenha/:idUsuario", async () => {
        const editarSenhaStub = sinon.stub(usuarioController, "editarSenha").callsFake((req, res) => res.status(200).send());

        const res = await request(app).put("/usuarios/editarSenha/1").send({});

        expect(editarSenhaStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call deletar on DELETE /usuarios/deletar/:idUsuario", async () => {
        const deletarStub = sinon.stub(usuarioController, "deletar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).delete("/usuarios/deletar/1").send({});

        expect(deletarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });
});
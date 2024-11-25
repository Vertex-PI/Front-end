const express = require("express");
const request = require("supertest");
const sinon = require("sinon");
const router = require("../routes/metas");
const metasController = require("../controllers/metasController");

// FILE: src/routes/metas.test.js


describe("Metas Routes", () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use("/metas", router);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should call listar on GET /metas/listar", async () => {
        const listarStub = sinon.stub(metasController, "listar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).get("/metas/listar");

        expect(listarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call publicar on POST /metas/publicar/:idEmpresa", async () => {
        const publicarStub = sinon.stub(metasController, "publicar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).post("/metas/publicar/1").send({});

        expect(publicarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call editar on PUT /metas/editar/:idAviso", async () => {
        const editarStub = sinon.stub(metasController, "editar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).put("/metas/editar/1").send({});

        expect(editarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });

    it("should call deletar on DELETE /metas/deletar/:idAviso", async () => {
        const deletarStub = sinon.stub(metasController, "deletar").callsFake((req, res) => res.status(200).send());

        const res = await request(app).delete("/metas/deletar/1").send({});

        expect(deletarStub.calledOnce).toBe(true);
        expect(res.status).toBe(200);
    });
});
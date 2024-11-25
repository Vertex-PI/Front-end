const sinon = require("sinon");
const usuarioModel = require("../models/usuarioModel");
const database = require("../database/config");

describe("Usuario Model", () => {
    let executarStub;

    beforeEach(() => {
        executarStub = sinon.stub(database, "executar");
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("autenticar", () => {
        it("should construct the correct SQL query and call database.executar", async () => {
            const email = "test@example.com";
            const senha = "password123";
            const expectedSql = `
        SELECT u.idUsuario, u.nome, u.senha, u.email, u.fk_idEmpresa, c.idCargos, c.temPermissaoAdm
        FROM Usuario u
        JOIN Cargos c ON u.fk_cargos = c.idCargos
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;

            await usuarioModel.autenticar(email, senha);

            expect(executarStub.calledOnce).toBe(true);
            expect(executarStub.calledWith(expectedSql)).toBe(true);
        });

        it("should return the result of database.executar", async () => {
            const email = "test@example.com";
            const senha = "password123";
            const expectedResult = { idUsuario: 1, nome: "Test User" };
            executarStub.resolves(expectedResult);

            const result = await usuarioModel.autenticar(email, senha);

            expect(result).toBe(expectedResult);
        });
    });
});
const request = require("supertest")
const apiUrl = "http://localhost:8010/api/v1"

describe('teste controller', () => {

    it('Testando se o post está enviando', async () => {
        const response = await request(apiUrl)
            .post('/cadastroUser')
            .send({
                name: "name test2",
                email: "email2@test.com",
            })

        expect(response.status).toBe(201)
        expect(response.body.name).toBe("name test2")
    })

    it("Testando post e o get", async () => {
        const response = await request(apiUrl)
            .post('/cadastroUser')
            .send({
                name: "jonas"
            })
            .then(() => {
                return request(apiUrl)
                    .get("/cadastroUser")
            })
        expect(response.status).toBe(200)
    })

    it('Testando o put', async () => {
        const response = await request(apiUrl)
            .put('/cadastroUser/1234')
            .send({
                name: "name test"
            })

        expect(response.status).toBe(200)
        expect(response.body.BD.usuario.name).toBe("name test")
    })

    it('Testando se o put da erro com id errado', async () => {
        const response = await request(apiUrl)
            .put('/cadastroUser/123')
            .send({
                name: "name test"
            })

        expect(response.status).toBe(404)
    })

    it("Testando o put e se o get", async () => {
        const response = await request(apiUrl)
            .put("/cadastroUser/1234")
            .send({
                name: "name test"
            })
            .then(() => {
                return request(apiUrl)
                    .get("/cadastroUser/1234")
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("name test")
    })

    it("Testando o delete", async () => {
        const response = await request(apiUrl)
            .delete("/cadastroUser/1234")

        expect(response.status).toBe(200)
        expect(response.body.BD.name).toBe(undefined)
    })

    it("Testando falha no delete", async () => {
        const response = await request(apiUrl)
            .delete("/cadastroUser/123")
        expect(response.status).toBe(404)
    })
})
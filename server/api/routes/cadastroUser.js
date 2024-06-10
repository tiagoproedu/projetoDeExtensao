module.exports = app => {
    const controller = app.controller.cadastroUser

    app.route('/api/v1/cadastroUser')
        .get(controller.list)
        .post(controller.save);

    app.route('/api/v1/cadastroUser/:id')
        .delete(controller.remove)
        .put(controller.update)
        .get(controller.getUser)

    app.route('/api/v1/pesquisarVazamento/:email')
        .get(controller.getLeak)
}
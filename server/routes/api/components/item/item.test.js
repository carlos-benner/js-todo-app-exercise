const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../../app');

chai.should();
chai.use(chaiHttp);

/**
 * Existing item
 * {
        "id": "c80d3a88-932b-4526-bd51-8869b795aa97",
        "list_id": "dbd6f8ca-e6bc-4d20-9504-d9755ee310e1",
        "label": "Decentralized maximized extranet",
        "created_at": "2020-10-25T15:52:33Z"
    },
 */

const item = {
    list_id: 'dbd6f8ca-e6bc-4d20-9504-d9755ee310e1',
    label: 'This is a test',
    created_at: '2021-12-18T15:21:18Z',
};

describe('TO-DO items API', () => {
    /**
     * Test GET route
     */

    describe('GET /api/items', () => {
        it('It should get all items', (done) => {
            chai.request(app)
                .get('/api/items/')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(500);
                    done();
                });
        });
        it('It should contain specific item', (done) => {
            chai.request(app)
                .get('/api/items/')
                .end((error, response) => {
                    response.should.have.status(200);
                    const item = response.body.find(
                        (el) => el.id === 'c80d3a88-932b-4526-bd51-8869b795aa97'
                    );
                    item.should.be.an('object');
                    item.id.should.be.eq(
                        'c80d3a88-932b-4526-bd51-8869b795aa97'
                    );
                    item.list_id.should.be.eq(
                        'dbd6f8ca-e6bc-4d20-9504-d9755ee310e1'
                    );
                    item.label.should.be.eq('Decentralized maximized extranet');
                    item.created_at.should.be.eq('2020-10-25T15:52:33Z');
                    (!item.completed_at).should.be.true;
                    done();
                });
        });
    });

    /**
     * Test GET by ID route
     */
    describe('GET /api/items', () => {
        it('It should return item with id c80d3a88-932b-4526-bd51-8869b795aa97', (done) => {
            chai.request(app)
                .get('/api/items/c80d3a88-932b-4526-bd51-8869b795aa97')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.id.should.be.eq(
                        'c80d3a88-932b-4526-bd51-8869b795aa97'
                    );
                    response.body.list_id.should.be.eq(
                        'dbd6f8ca-e6bc-4d20-9504-d9755ee310e1'
                    );
                    response.body.label.should.be.eq(
                        'Decentralized maximized extranet'
                    );
                    response.body.created_at.should.be.eq(
                        '2020-10-25T15:52:33Z'
                    );
                    (!response.body.completed_at).should.be.true;
                    done();
                });
        });
        it('It should not return an item with nonexistent id', (done) => {
            chai.request(app)
                .get('/api/items/c80d3a88-932b-4526-bd51-8869b795aa972')
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * Test POST route
     */
    describe('POST /api/items', () => {
        let new_item;
        it('It should create a new item', (done) => {
            chai.request(app)
                .post('/api/items')
                .send(item)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('label').eq(item.label);
                    response.body.should.have
                        .property('list_id')
                        .eq(item.list_id);
                    response.body.should.have.property('created_at');
                    new_item = response.body;
                    done();
                });
        });
        it('Item created should persist', (done) => {
            chai.request(app)
                .get(`/api/items/${new_item.id}`)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.id.should.be.eq(new_item.id);
                    response.body.list_id.should.be.eq(new_item.list_id);
                    response.body.label.should.be.eq(new_item.label);
                    response.body.created_at.should.be.eq(new_item.created_at);
                    (response.body.completed_at === new_item.completed_at)
                        .should.be.true;
                    done();
                });
        });
    });

    /**
     * Test PUT route
     */

    describe('PUT /api/items', () => {
        const data = {
            list_id: '2f13009f-1aff-4381-bdc4-0b017a7a524b',
            label: 'This is a new label',
            created_at: '2022-08-10T13:11:12Z',
            completed_at: '2023-01-13T11:12:15Z',
        };

        it('It should modify item with id c80d3a88-932b-4526-bd51-8869b795aa97', (done) => {
            chai.request(app)
                .put('/api/items/c80d3a88-932b-4526-bd51-8869b795aa97')
                .send(data)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.id.should.be.eq(
                        'c80d3a88-932b-4526-bd51-8869b795aa97'
                    );
                    response.body.list_id.should.be.eq(data.list_id);
                    response.body.label.should.be.eq(data.label);
                    response.body.created_at.should.be.eq(data.created_at);
                    response.body.completed_at.should.be.eq(data.completed_at);
                    done();
                });
        });

        it('It keep the item item with id c80d3a88-932b-4526-bd51-8869b795aa97 modified', (done) => {
            chai.request(app)
                .get('/api/items/c80d3a88-932b-4526-bd51-8869b795aa97')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.id.should.be.eq(
                        'c80d3a88-932b-4526-bd51-8869b795aa97'
                    );
                    response.body.list_id.should.be.eq(data.list_id);
                    response.body.label.should.be.eq(data.label);
                    response.body.created_at.should.be.eq(data.created_at);
                    response.body.completed_at.should.be.eq(data.completed_at);
                    done();
                });
        });
    });
    /**
     * Test DELETE route
     */

    describe('DELETE /api/items', () => {
        it('It should delete item with id c80d3a88-932b-4526-bd51-8869b795aa97 without errors', (done) => {
            chai.request(app)
                .delete('/api/items/c80d3a88-932b-4526-bd51-8869b795aa97')
                .end((error, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

        it('It keep the item item with id c80d3a88-932b-4526-bd51-8869b795aa97 deleted', (done) => {
            chai.request(app)
                .get('/api/items/c80d3a88-932b-4526-bd51-8869b795aa97')
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});

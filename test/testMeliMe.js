let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';


/***************************************************************************/
/****************************** API BUSQUEDA *******************************/
/***************************************************************************/

describe('Realizar una busqueda, por GET, sin token: ',()=>{
    it('Deberia devolver un 401', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(401);
            done();
        });
    });
});

describe('Realizar una busqueda, por GET, y enviar token mock: ',()=>{
    it('Deberias ver los resultados mockeados', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": '55a4639f-55e8-4e14-a6cc-b79977b20a4e' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});


describe('Realizar una busqueda, por GET, con token valido: ',()=>{
    it('Deberias ver los resultados, en formato JSON', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});

describe('Realizar una busqueda, por POST: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .post('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   

describe('Realizar una busqueda, por DELETE: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .delete('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   

describe('Realizar una busqueda, por PUT: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .put('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })        
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   

describe('Realizar una busqueda, por GET, con token valido sin cadena de busqueda: ',()=>{
    it('Deberia devolver estado 400 y bad request', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: '', limit: 2, sort: 'PriCe_desc', offset: 8, site: 'mLa'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400);
            done();
        });
    });
});

describe('Realizar una busqueda, por GET, con token valido, sin el parametro SITE o con el mismo erroneo (solo MLA, MLB y MLM): ',()=>{
    it('Deberia devolver estado 400 y bad request', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'PriCe_desc', offset: 8})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            done();
        });
    });
});

describe('Realizar una busqueda, por GET, con token valido, sin los parametros limit y offset o con alguno mal formado (trae los mismos por defecto, limit 50 y offset 0): ',()=>{
    it('Deberias ver los resultados, en formato JSON, sin el limite de resultados ni el offset de los mismos.', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', sort: 'PriCe_desc', site: 'mLB'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});

describe('Realizar una busqueda, por GET, con token valido, sin el parametro sort o con el mismo mal formado o invalido (trae el orden por defecto es decir, relevancia): ',()=>{
    it('Deberias ver los resultados, en formato JSON, ordenados por relevancia.', (done) => {
        chai.request(url)
        .get('/api/producto')
        .query({search: 'silla gamer redragon metis', limit: 2, sort: 'ordenerroneo', offset: 8, site: 'mLB'})
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});



/***************************************************************************/
/******************************** API ITEM *********************************/
/***************************************************************************/

describe('Pedir un item, por GET, sin token: ',()=>{
    it('Deberias devolver un 401', (done) => {
        chai.request(url)
        .get('/api/item/MLA857409237')
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(401);
            done();
        });
    });
});

describe('Pedir un item, por GET, y enviar token mock: ',()=>{
    it('Deberias ver un item mockeado', (done) => {
        chai.request(url)
        .get('/api/item/MLA857409237')
        .set({ "x-auth-token": '55a4639f-55e8-4e14-a6cc-b79977b20a4e' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});


describe('Pedir un item, por GET, con token valido: ',()=>{
    it('Deberias ver un item, en formato JSON', (done) => {
        chai.request(url)
        .get('/api/item/MLA857409237')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        });
    });
});
   
describe('Pedir un item, por POST: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .post('/api/item/MLA857409237')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   

describe('Pedir un item, por DELETE: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .delete('/api/item/MLA857409237')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   

describe('Pedir un item, por PUT: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .put('/api/item/MLA857409237')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});   


describe('Pedir un item, por GET con el id malformado: ',()=>{
    it('Deberia devolver 400 y bad request', (done) => {
        chai.request(url)
        .get('/api/item/MLA857+09237')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400);
            done();
        });
    });
});


describe('Pedir un item, por GET sin el id: ',()=>{
    it('Deberia devolver 404', (done) => {
        chai.request(url)
        .get('/api/item/')
        .set({ "x-auth-token": 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' })
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    });
});



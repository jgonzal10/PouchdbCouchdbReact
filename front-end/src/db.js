import PouchDB from 'pouchdb'

export default class DB {

    constructor(name) {
       
        this.db = new PouchDB(name);
        this.remote = new PouchDB('http://localhost:5984/femmes');
    }


    async getAllFemmes(){
        //console.log('get all')
        let allFemmes =await this.db.allDocs({include_docs:true});
     

        await this.db.sync(this.remote).on('complete', function () {
           
          }).on('error', function (err) {
            console.log('something happend while sync ', err)
          });
        return allFemmes.rows;
       // let femmes={};
      //  allFemmes.rows.forEach(n=>femmes[n.id]=n.doc)
        //console.log('all femmes ',allFemmes)



    }

    async CreateFemme(femme) {
        femme.createdAt =new Date();
        femme.updatedAt = new Date();
        femme._id = new Date().toISOString();
        const res = await this.db.put({...femme});
        return res;
     }




}
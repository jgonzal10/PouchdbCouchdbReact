import PouchDB from 'pouchdb'

export default class DB {

    constructor(name) {
        console.log('db name ', name)
        this.db = new PouchDB(name);
        this.remote = new PouchDB('http://localhost:5984/femmes');
    }


    async getAllFemmes(){
        //console.log('get all')
        let allFemmes =await this.db.allDocs({include_docs:true});
        console.log('allfeme ', allFemmes)

        await this.db.sync(this.remote).on('complete', function () {
            console.log('done')
          }).on('error', function (err) {
            // boo, something went wrong!
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
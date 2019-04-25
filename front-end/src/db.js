import PouchDB from 'pouchdb'

export default class DB {

  constructor(name) {

    this.db = new PouchDB(name);
    this.remote = new PouchDB('http://localhost:5984/femmes');
  }


  async getAllFemmes() {

    try {

      /**
       * Get ALL DOCUMENTS
       */
      let allFemmes = await this.db.allDocs({ include_docs: true });

      /**BIDERECTIONAL REPLICATION
       * This is the main step to make the synchronization process possible
       */

      var opts = { live: true, retry: true };
      await this.db.sync(this.remote, [opts]).on('change', function (info) {
        console.log('something changed ', info)
      }).on('complete', function () {
        console.log('sync completed')
      }).on('error', function (err) {
        console.log('something happend while sync ', err)
      });
      return allFemmes.rows;
    } catch (err) {
      console.log(err)
      return err;
    }
  }

  //GET WOMEN BY ID
  async getFemmeById(id) {
    try {
      var femme = await this.db.get(id);
      return femme;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  //CREATING A NEW WOMAN
  async CreateFemme(femme) {
    try {

      /**
       * db.put  to Create new Documents
       */
      femme.createdAt = new Date();
      femme.updatedAt = new Date();
      femme._id = new Date().toISOString();
      const res = await this.db.put({ ...femme });
      return res;
    } catch (err) {
      console.log(err)
      return err;
    }

  }

    //CREATING A NEW WOMAN POST, NO ID NEEDED
    async CreateFemmePost(femme) {
      try {
  
        /**
         * db.post  to Create new Documents
         */
        femme.createdAt = new Date();
        femme.updatedAt = new Date();
        const res = await this.db.put({ ...femme });
        return res;
      } catch (err) {
        console.log(err)
        return err;
      }
  
    }

  //EDIT A WOMAN PASSING NEW VALUES
  async EditFemme(femme) {
    try {

      /**
       * First I need to get the document by its id, 
       * then Update it with its new values
       */
      var doc = await this.db.get(femme.id);
      await this.db.put({
        _id: femme.id,
        _rev: doc._rev,
        name: femme.name,
        job: femme.job
      });
    } catch (err) {
      console.log(err);
    }
  }

  //DELETE A WOMAN
  async deleteFemme(id) {
    try {

      /**
       * First get the document by its id and then remove the document.
       */
      var femme = await this.db.get(id);
       await this.db.remove(femme);
     
    } catch (err) {
      console.log(err);
    }

  }
}
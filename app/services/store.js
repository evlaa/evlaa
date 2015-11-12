import DS from 'ember-data';

export default DS.Store.extend({
  query_paginated(object, query, page = 1){
    console.log('paginated_query !', page);
    query['page'] = page;
    this.query(object, query).then((loaded)=>{
      if( loaded.content.length !== 0){
        this.query_paginated(object, query, page+1);
      }
    });
  }
});

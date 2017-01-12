function dashState(){
  // console.log(this.create)
  return {
    create : create,
    preload : preload,
    update : update
  }

  function preload(){
    // console.log('preload')
  }

  function create(){
    console.log('create')
  }

  function update(){
    // console.log('update')
  }
}


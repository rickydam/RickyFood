const reduxUpdate = (currentProps, prevProps, updateComponentStateFn, clearComponentStateFn) => {
  if(currentProps.redux.restaurant !== prevProps.redux.restaurant) {
    if(currentProps.redux.restaurant !== null) {
      // Case 1: object and null
      // Restaurant has been selected
      updateComponentStateFn();
    }
    else {
      // Case 2: null and object
      // Restaurant cleared
      clearComponentStateFn();
    }
  }
  else {
    if(currentProps.redux.restaurant !== null && prevProps.redux.restaurant !== null) {
      // Make sure both, this.props and prevProps, have a non-null restaurant property before accessing it
      if(currentProps.redux.restaurant.key !== prevProps.redux.restaurant.key) {
        // Case 3: object and object
        // Restaurant has been switched
        updateComponentStateFn();
      }
    }
    else {
      // Case 4: null and null
      // No action required
    }
  }
};

module.exports = reduxUpdate;
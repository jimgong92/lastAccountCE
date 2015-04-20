var userTemplate = {
  "username": "jimgong92",
  "first": "Jimmy",
  "last": "Gong",
  "fullName": "Jimmy Gong",
  "email": "gong.jim@gmail.com"
}

$(function(){
  var inputs = getCredentialInputs();

  inputs.each(function(tagId, tag){
    if (isCredentialTag(tag, ['username', 'user-name'])){
      tag.value = userTemplate['username'];
    }
    else if (isCredentialTag(tag, 'first')){
      tag.value = userTemplate['first'];
    }
    else if (isCredentialTag(tag, 'last')){
      tag.value = userTemplate['last'];
    }
    else if (isCredentialTag(tag, 'name')){
      tag.value = userTemplate['name'];
    }
    else if (isCredentialTag(tag, ['email', 'e-mail'])){
      tag.value = userTemplate['email'];
    }
  });
});
/**
 * @params: tag (DOM element), keys (Array[String])
 * Returns boolean regarding whether tag contains the key type (e.g. username, password)
 */
function isCredentialTag(tag, keys){
  if (!Array.isArray(keys)){
    keys = [keys];
  }
  var placeholder = tag.placeholder.toLowerCase(),
      name = tag.name.toLowerCase(),
      id = tag.id.toLowerCase(),
      className = $(tag).attr('class');
  var attributes = [placeholder, name, id, className];
  for (var i = 0; i < attributes.length; i++){
    if (attributes[i]){
      for (var j = 0; j < keys.length; j++){
        if (attributes[i].indexOf(keys[j]) !== -1){
          return true;
        }
      }
    }
  }
  return false;
}
/**
 * Returns all text input tags
 */
 function getCredentialInputs(){
   return $('input').filter(function(tagId, tag){
    if (tag.type === 'email'){
      tag.value = userTemplate['email'];
    }
    return tag.type === 'text';
  });
 } 

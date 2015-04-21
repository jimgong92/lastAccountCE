// var dummyData = {
//   "username": "jimgong92",
//   "first": "Jimmy",
//   "last": "Gong",
//   "fullName": "Jimmy Gong",
//   "email": "gong.jim@gmail.com",
// }
// chrome.storage.sync.set({'lastAccountTemplate': dummyData});


$(function(){
  chrome.storage.sync.get('lastAccountTemplate', function(item){
    var template = item['lastAccountTemplate'];
    var inputs = getCredentialInputs(template);
    inputs.each(function(tagId, tag){
      if (isCredentialTag(tag, ['username', 'user-name'])){
        tag.value = template['username'] || '';
      }
      else if (isCredentialTag(tag, 'first')){
        tag.value = template['first'] || '';
      }
      else if (isCredentialTag(tag, 'last')){
        tag.value = template['last'] || '';
      }
      else if (isCredentialTag(tag, 'name')){
        tag.value = template['name'] || '';
      }
      else if (isCredentialTag(tag, ['email', 'e-mail'])){
        tag.value = template['email'] || '';
      }
    });
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
 function getCredentialInputs(template){
   return $('input').filter(function(tagId, tag){
    if (tag.type === 'email'){
      tag.value = template['email'];
    }
    return tag.type === 'text';
  });
 } 

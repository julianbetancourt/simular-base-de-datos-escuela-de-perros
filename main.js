// Almacena objetos
var fields = [];

//Cuando la forma es llenada
$('#form form').submit(function(event) {
  //Llevar scroll al inicio
  $(window).scrollTop(0);
  //remover aviso de exito
  $('.success').remove();
  //añadir campos diligenciados en forma de objetos a variable fields
  fields.push($('#form :input').serializeArray());
  //reiniciar campos de texto
  $('#form :input:text').val('');
  //span de exito
  var successSpan = '<span class="success">Perro Añadido Exitosamente!</span>';
  //añadir exito a inicio de #form
  $('#form').prepend(successSpan);
  $('#form').css('margin-top', '0');
  event.preventDefault();
});


function getDog(localidad) {
  //Por cada item en el array fields
  for (var i = 0, j = fields.length; i < j; i += 1) {
    //si el tercer valor de ese item es igual a localidad
    if (fields[i][2].value === localidad && $('#search #localidades').val() === localidad) {
      //crear variables
      var dogsDiv = $('.dogs');
      var dogDiv = $('<div class="dog"></div>');
      var titleDiv = $('<div class="title"></div>');
      var nombre = $('<span>' + fields[i][0].value + '</span>');
      var content = $('<div class="content"></div>');
      //agregar variables a DOM
      dogDiv.append(titleDiv);
      titleDiv.append(nombre);
      dogDiv.append(content);
      //Por cada objeto en ese item
      for (var a = 1, b = fields[i].length; a < b; a += 1) {
        //Añadir variables
        var item = $('<p class="item"></item>');
        var type = $('<span class="type">' + fields[i][a].name + ': </span>');
        var value = $('<span class="value">' + fields[i][a].value + '</span>');
        //Agregar variables a DOM
        item.append(type);
        item.append(value);
        content.append(item);
      }
      //Agregar parentNode a dogDiv
      dogsDiv.append(dogDiv);
    }
  }
}


//Cuando se cambia el select en la busqueda
$('#search #localidades').change(function(event) {
  //limpiar .dogs
  $('#search .dogs').empty();
  //por cada opcion
  for (var i = 0, j = $('#form select').children().length; i < j; i += 1) {
    //parametro localidad es igual al atributo valor
    getDog($('#form select').children().eq(i).attr('value'));
  }
});

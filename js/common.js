window.addEventListener('DOMContentLoaded', function() {
   var btnCall = document.querySelector('.callback'),
      btnMess = document.querySelector('.mess'),
      mainForm = document.querySelector('#modal-form');
      

   btnCall.addEventListener('click', function() {
      $('#myModal').find('.modal-body').first().show();
      $('#myModal').find('.modal-footer').first().show();
      $('#myModal').find('.h2').first().text('Заказ обратного звонка').css('display', 'block');
      $('#myModal').find('.h2').first().css('text-align', 'center');
      $('#myModal').find('.modal-body').first().html('<div class="form-group"><label for="name">Имя</label><input type="text" name="name" id="name" class="form-control" ></div><div class="form-group"><label for="contact">Номер телефона</label><input type="text" name="contact" id="contact" class="form-control" ></div>');
      telMask();
      $('#myModal').find('.modal-footer').first().html('<button type="submit" class="btn btn-primary ord">Отправить</button>');
      });
   btnMess.addEventListener('click', function() {
      $('#myModal').find('.modal-body').first().show();
      $('#myModal').find('.modal-footer').first().show();
      $('#myModal').find('.h2').first().text('Форма отправки сообщения').css('display', 'block');
      $('#myModal').find('.h2').first().css('text-align', 'center');
      $('#myModal').find('.modal-body').first().html('<div class="form-group"><label for="name">Имя</label><input type="text" name="name" id="name" class="form-control" ></div><div class="form-group"><label for="contact">Номер телефона</label><input type="text" name="contact" id="contact" class="form-control" ></div><div class="form-group"><label for="mail">Почта</label><input class="form-control" name="mail" type="text" id="mail" ></div><div class="form-group"><label name="mess">Сообщение</label><textarea class="form-control" name="mess" type="text" id="mess" ></textarea></div>');
      telMask();
      $('#myModal').find('.modal-footer').first().html('<button type="submit" class="btn btn-primary ord">Отправить</button>');
   
   });



   let toServer = { // Создаем объект с методом отправки данных на сервер
      Go(event) { // В качестве аргумента передаем контекст вызова

         event = event.preventDefault();

         let request = new XMLHttpRequest();

         request.open('POST', 'server.php');
         // кодировка
         request.setRequestHeader('Content-Type', 'application/x-www-form-unlencoded');

         let formData = new FormData(this);

         request.send(formData);

         request.onreadystatechange = () => {
            if (request.readyState < 4) {
               $('#myModal').find('.h2').first().fadeIn().text('Идет отправка').css('display', 'block');
               $('#myModal').find('.modal-body').first().hide();
               $('#myModal').find('.modal-footer').first().hide();
            } else if (request.readyState === 4) {
               if (request.status == 200 && request.status < 300) { // коды ошибок
                  $('#myModal').find('.h2').first().fadeIn().text('Отправка прошла успешно').css('display', 'block');
                  $('#myModal').delay(1500).fadeOut(700);
                  $('.modal-backdrop').delay(1500).fadeOut(700);
               } else {
                  $('#myModal').find('.h2').first().fadeIn().text('Что то пошло не так, отправьте форму еще раз').css('display', 'block');
                  $('#myModal').delay(1500).fadeOut(700);
                  $('.modal-backdrop').delay(1500).fadeOut(700);
               }
            };
         };
      }
   };

   mainForm.addEventListener('submit', toServer.Go);



   // masked input tel
   function telMask () {
      jQuery(function($) {

         $.mask.definitions['~']='[+-]';

         $('#contact').mask('+7 (999) 999-9999');

         });
   }

})
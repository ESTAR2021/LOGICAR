$(document).ready(function () {
	$(document).on('click', '#logout', function () {
		console.log('click');
		$.ajax({
			type: 'GET',
			url: '../php/logoutautista.php',
			success: function (data) {
				location.href = '../login.html';
			}
		});
	});

});
	

	
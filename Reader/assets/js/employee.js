
$(".list-group-item").click(evt => {
	$.ajax({
		url : "getinfo.php",
		method: 'POST',
		data: {"id": evt.target.id },
		success : function (data) {
			console.log(data);
			data = JSON.parse(data);
			let htmlContent = `
				<tr>
					<td>${data.id}</td>
					<td>${data.name}</td>
					<td>${data.designation}</td>
					<td>${data.office}</td>
					<td>${data.mobile}</td>
					<td>${data.email}</td>
					<td>${data.room_location}</td>
				</tr>
			`;
			$("#tableContent").html(htmlContent);
			$("#staffInfo").show(300);
		},
		beforeSend: function (data) {

		},
		error: function (error) {

		}
	})
})
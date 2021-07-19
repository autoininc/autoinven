(function ($) {
    "use strict"; // Start of use strict
    $(document).ready(function () {

        //send sign up data to server
        $("#enrollForm").submit(function (evt) {
            evt.preventDefault();

            var whName = $("#warehouseName").val();
            var address = $("#address").val();
            var landArea = $("#landArea").val();
            var floorArea = $("#floorArea").val();
            var price =$("#price").val();
            var infoComment = $("#infoComment").val();
            var etcComment = $("#etcComment").val();
            var image = $("#profile_img").val();

            //check wname is not null
            if (!whName) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse name'
                })
            }
            //check password is not null
            else if (!address) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse address'
                })
            }           
            //check email is not null
            else if (!landArea) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse land area'
                })
            }
            else if (!floorArea) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: "You have to insert your warehouse floor area"
                })
            }
            else if (!price) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: "You have to insert your warehouse price"
                })
            }
            else if (!image) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to upload your warehouse picture'
                })
            }
            //finish all test
            else {
                var formData = new FormData(document.getElementById('enrollForm'));
                var formDataArr = formData.getAll('profile_img');
                console.log('getAll :' + formDataArr);
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: formData,
                    processData : false,
                    contentType: false,
                    success: function (data) {
                        if (data == "errortype2") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Please enter only numbers in the landArea field.',
                            }).then(() => {
                            })
                        } else if (data == "errortype3") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Please enter only numbers in the floorArea field.',
                            }).then(() => {
                            })
                        } else if (data == "errortype4") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Please enter only numbers in the price field.',
                            }).then(() => {
                            })
                        } else if (data == "errortype5") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'An error was occurred.',
                            }).then(() => {
                            })
                        } else if (data == "errortype6") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Please enter the Warehouse Name, infoComment, etcComment in English or number.',
                            }).then(() => {
                            })
                        } else if (data == "errortype7") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Duplicate Warehouse IDs exist.',
                            }).then(() => {
                            })
                        } else if (data == "errortype8") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text:  'Please log in.',
                            }).then(() => {
                            })
                        } else if (data == "errortype0") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text:  'Successfully completed warehouse enrollment.',
                            }).then(() => {
                                location.href = "/";
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title : 'Fail',
                                text: 'An error was occurred.',
                            }).then(() => {
                            }
                            )}
                    },
                    error: function (request, status, error) {
                        Swal.fire({
                            title: 'Error',
                            html: `code: ${request.status}<br>message: ${request.responseText}<br>error: ${error}`,
                            icon: 'error'
                        });
                    }
                })
            }
        })
    })
})(jQuery);
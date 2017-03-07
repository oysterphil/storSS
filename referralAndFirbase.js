

		// Event Listeners
		document.getElementById("register").addEventListener("click", handleRegister);
		document.getElementById("login").addEventListener("click", handleLogin);
		document.getElementById("logout").addEventListener("click", handleSignout);
		document.getElementById("submitPasswordReset").addEventListener("click", resetPassword);

		// View Controllers
		function displayProfile() {
				document.getElementById("signupForm").style.display = 'none';
				document.getElementById("profile").style.display = 'block';
		};

		function displaySignup() {
				document.getElementById("signupForm").style.display = 'block';
				document.getElementById("profile").style.display = 'none';
		};
		
		// Regsitration and Login Logic
		function handleRegister() {
			var firstName = document.getElementById('firstName').value;
			var lastName = document.getElementById('lastName').value;
			var email = document.getElementById("email").value;
			var password = document.getElementById("password").value;


			$.ajax({
			    type: 'POST',
			    // 'http://f4549ce0.ngrok.io/' + 'referralCandy/sign-up',
			    url: 'https://young-plateau-13187.herokuapp.com/' + 'referralCandy/invite',
			    data: JSON.stringify({	
					email: email
				}), 
			    success: function(data) {
					if (data.message === 'Success') {
						console.log('It worked.');
						// delete data.message;
						// sendRegisterDataToFirebase(data, email, password, firstName, lastName);

					}
				},
			    contentType: "application/json",
			    dataType: 'json'
			});
		}

		function sendRegisterDataToFirebase (data, email, password, firstName, lastName) {
			firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
				var user = firebase.auth().currentUser;
	            var uid = user.uid;

	            firebase.database().ref('referrers/' + user.uid).set({
	                  firstName: firstName,
	                  lastName: lastName,
	                  email: email,
	                  referralCandy: data
		        })
		      document.getElementById("yourName").innerHTML = 'Welcome, ' + '' + firstName;
		      document.getElementById('referralUrl').innerHTML = data.referral_link;
			  	displayProfile();
				}, function(error){
					alert(error.message);
				})
			}
		

		function handleLogin() {
			var email = document.getElementById("email").value
			var password = document.getElementById("password").value

			// Log in the user and append his/her email to the top of the profile page

		      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
		        var user = firebase.auth().currentUser;
		        var userEmail;

		        if (user != null) {
		          userEmail = user.email; 
		        }
        document.getElementById("yourName").innerHTML = 'Welcome, ' + '' + userEmail; 		
				displayProfile();
			}, function(error){
					alert(error.message);
				})
		};

		function handleSignout() {
		  firebase.auth().signOut()
		  displaySignup()
		};

		// Forgot Password Logic

			// When the user clicks anywhere outside of the modal, close it
			var modal = document.getElementById('forgotPassword');
			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
}

		function resetPassword () {
		  var auth = firebase.auth();
		  const emailAddress = document.getElementById('forgotPasswordEmail').value;
		  auth.sendPasswordResetEmail(emailAddress).then(function() {
		    // Display the result of the reset password submission
		    document.getElementById('forgotPasswordForm').style.display = "none";
		    document.getElementById('submitPasswordReset').style.display = "none";
		    document.getElementById('forgotPasswordResult').style.display = "block";
		    document.getElementById('forgotPasswordResult').innerHTML = "Thank you. Please check your email for a link to reset your password.";

		  }, function(error) {
		      // Display Error Message
		    document.getElementById('forgotPasswordResult').innerHTML = 
		        "<div class=\"alert alert-danger\" role=\"alert\" align=\"center\"> \
		        <strong>" + error.message + "</strong>\
		      </div>";
		  });
	}
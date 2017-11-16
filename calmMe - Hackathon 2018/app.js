(function(){

	// Initialization of Firebase:
	const config = {
		apiKey: "AIzaSyBK2GTtqYmNwGpOufvc4kLbBjyeuB06uxA",
    	authDomain: "calmme-de222.firebaseapp.com",
    	databaseURL: "https://calmme-de222.firebaseio.com",
    	projectId: "calmme-de222",
    	storageBucket: "calmme-de222.appspot.com",
    	messagingSenderId: "502850369471"
	};

	firebase.initializeApp(config);

	// Collect elements:
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Attach click event to login button:
	btnLogin.addEventListener('click', e => {
		// Get email and password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email,pass).then(function(user){
			window.location = 'signedin.html';
		}).catch(function(error){
			promise.catch(e => console.log(e.message));

		});

	});



	// Attach click event to signup:
	btnSignUp.addEventListener('click', e => {
		// Get email and password
		// To do: check if it's a real email address
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		var user = firebase.auth().currentUser;
		user.sendEmailVerification().then(function(){
			// Email sent.
		}).catch(function(error){
			// An error happened.
		});

		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email, pass);

		promise
			.catch(e => console.log(e.message));
	});

	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut().then(function(){
			console.log('Logging out...');
			//window.location = 'signedin.html';
		}, function(error) {
			console.error('message', error);
		});

	});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			console.log('Logged in.');
			btnLogout.classList.remove('hide');
		} else{
			console.log('Not logged in.');
			btnLogout.classList.add('hide');
		}
	});


}());

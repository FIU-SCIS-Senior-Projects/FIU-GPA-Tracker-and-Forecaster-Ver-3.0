var emailOK   = false;
var userOK    = false;
var passOK    = false;
var passMatch = false;
var fnameOK   = false;
var lnameOK   = false;

function checkEmail(email)
{
	/*
	//This is an attempt to get the email text to match a regular expression.
	var emailForm = /^\w\w\w\w\w\d\d\d@fiu.edu$/i;
	if(!emailForm.test(email))
	{
		alert("Invalid Email")
	}
	*/
	var mes = document.getElementById("emailMes");
	if(email.indexOf("@")==-1 || email.indexOf("@")!= email.lastIndexOf("@") || email.length==1)
	{
		mes.innerHTML = "Invalid Email";
		mes.style.color = "red";
		mes.style.display = "initial";
		emailOK=false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		emailOK=true;
	}
}

function checkusername(user)
{
	var mes = document.getElementById("userMes");
	if(user.length == 0)
	{
		mes.innerHTML = "Username must be nonempty";
		mes.style.color = "red";
		mes.style.display = "initial";
		userOK = false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		userOK = true;
	}
}

function validatePassword(pass)
{
	var mes = document.getElementById("passwordMes");
	if(pass.length < 8)
	{
		mes.innerHTML = "Password must be at least 8 characters";
		mes.style.color = "red";
		mes.style.display = "initial";
		passOK = false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		passOK = true;
	}
}

function checkPasswords(pass1, pass2)
{
	var mes = document.getElementById("chkPassMes");
	if(pass1 !== pass2)
	{
		mes.innerHTML = "Passwords do not match";
		mes.style.color = "red";
		mes.style.display = "initial";
		passMatch = false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		passMatch = true;
	}
}

function fnameCheck(fname)
{
	var mes = document.getElementById("fnameMes");
	if(fname.length == 0)
	{
		mes.innerHTML = "First name must be nonempty";
		mes.style.color = "red";
		mes.style.display = "initial";
		fnameOK = false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		fnameOK = true;
	}
}

function lnameCheck(lname)
{
	var mes = document.getElementById("lnameMes");
	if(lname.length == 0)
	{
		mes.innerHTML = "Last name must be nonempty";
		mes.style.color = "red";
		mes.style.display = "initial";
		lnameOK = false;
	}
	else
	{
		mes.innerHTML = "";
		mes.style.display = "none";
		lnameOK = true;
	}
}

function validateInput()
{
	if(!(emailOK && userOK && passOK && passMatch && fnameOK && lnameOK))
	{
		alert("Fields entered incorrectly.\nAll fields must be non-empty\nPlease see error messages for more details");
		return false;
	}
	return true;
}

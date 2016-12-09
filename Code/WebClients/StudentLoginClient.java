package org.apache.ws.axis2;

import java.io.IOException;

public class StudentLoginClient {

	public static void main(String[] args) throws StudentLoginClassNotFoundExceptionException, StudentLoginSQLExceptionException {
		// TODO Auto-generated method stub
		
 try{
			 
	// String user = "mdoe";
	// String pass = "12345678";
	 StudentLoginStub test = new StudentLoginStub();    
	 StudentLoginStub.Login LoggingIn = new StudentLoginStub.Login();
	            
	           
	            String finalval = test.login(LoggingIn).get_return();
	          
	            		System.out.println(finalval);
	        }
	        catch (IOException e)
	        {
	            System.err.println("Caught IOException: " + e.getMessage());
	        }
	    

	}

}


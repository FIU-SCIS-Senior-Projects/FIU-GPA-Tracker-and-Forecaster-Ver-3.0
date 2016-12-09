package org.apache.ws.axis2;

import java.io.IOException;

public class StudentCoursesClient {

	public static void main(String[] args) throws StudentCoursesClassNotFoundExceptionException, StudentCoursesSQLExceptionException {
		// TODO Auto-generated method stub
		
 try{
			 

	 StudentCoursesStub test = new StudentCoursesStub();    
	 StudentCoursesStub.GetCourses getCourse = new StudentCoursesStub.GetCourses();
	            
	           
	            String finalval = test.getCourses(getCourse).get_return();
	          
	            		System.out.println(finalval);
	        }
	        catch (IOException e)
	        {
	            System.err.println("Caught IOException: " + e.getMessage());
	        }
	    

	}

}


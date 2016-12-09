package org.apache.ws.axis2;

import java.io.IOException;

public class CourseAssessmentsClient {

	public static void main(String[] args) throws CourseAssessmentsClassNotFoundExceptionException,  CourseAssessmentsSQLExceptionException {
		// TODO Auto-generated method stub
		
 try{
			 

	 CourseAssessmentsStub test = new CourseAssessmentsStub();    
	 CourseAssessmentsStub.GetAssessments gettingAssessments = new CourseAssessmentsStub.GetAssessments();
	 CourseAssessmentsStub.GetAssessments gettingGrades = new CourseAssessmentsStub.GetAssessments();
	           
	            String finalval = test.getAssessments(gettingAssessments).get_return();
	            String finalval2 = test.getAssessments(gettingGrades).get_return();
	            		
	            System.out.println(finalval + " !!! "  + finalval2);
	        }
	        catch (IOException e)
	        {
	            System.err.println("Caught IOException: " + e.getMessage());
	        }
	    

	}

}


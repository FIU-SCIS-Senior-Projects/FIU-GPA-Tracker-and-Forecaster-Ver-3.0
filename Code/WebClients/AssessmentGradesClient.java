package org.apache.ws.axis2;

import java.io.IOException;

public class AssessmentGradesClient {

	public static void main(String[] args) throws AssessmentGradesClassNotFoundExceptionException,  AssessmentGradesSQLExceptionException {
		// TODO Auto-generated method stub
		
 try{
			 

	 AssessmentGradesStub test = new AssessmentGradesStub();    
	 AssessmentGradesStub.GetAssessmentGrades gettingAssessmentGrades = new AssessmentGradesStub.GetAssessmentGrades();
	 AssessmentGradesStub.AddAssessmentGrade addingAssessmentGrades = new AssessmentGradesStub.AddAssessmentGrade();
	 AssessmentGradesStub.RemoveAssessmentGrade removingAssessmentGrades = new AssessmentGradesStub.RemoveAssessmentGrade();
	           
	            String finalval = test.addAssessmentGrade(addingAssessmentGrades).get_return();
	            String finalval2 = test.removeAssessmentGrade(removingAssessmentGrades).get_return();
	            String finalval3 = test.getAssessmentGrades(gettingAssessmentGrades).get_return();		
	            System.out.println(finalval + " !!! "  + finalval2 + " ??? " + finalval3);
	        }
	        catch (IOException e)
	        {
	            System.err.println("Caught IOException: " + e.getMessage());
	        }
	    

	}

}


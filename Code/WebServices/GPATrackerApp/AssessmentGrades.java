import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AssessmentGrades {
	
	public String GetAssessmentGrades (String userID,String courseID,String assessmentName) throws ClassNotFoundException, SQLException{
		 
	     String assessmentGradeArray="";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("SELECT grade FROM Assessment WHERE "
	       		+ "assessmentTypeID in (select assessmentTypeID FROM AssessmentType WHERE"
	       		+ " AssessmentName = '" + assessmentName + "') AND studentCourseID in "
	       		+ "(SELECT studentCourseID FROM StudentCourse WHERE"
	       		+ " grade = 'IP' and userID = '" + userID + "'	AND courseInfoID in"
	       				+ " (select courseInfoID FROM CourseInfo WHERE courseID = '" + courseID + "'))");
		
	       try{
	           ResultSet r1=st.executeQuery();

	            while(r1.next()) {

	               // make a string that looks like : 80!!75!!90
	            	assessmentGradeArray = assessmentGradeArray + r1.getString("grade");
	            	assessmentGradeArray = assessmentGradeArray + "!!";
	              
	                }
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
     
	   		
	   			return assessmentGradeArray;
	   		
	   
	}
	
	public String RemoveAssessmentGrade (String userID,String courseID,String assessmentName, String grade)
			throws ClassNotFoundException, SQLException{
		 
	     String assessmentRemoved="false";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("Delete from Assessment WHERE "
	       		+ "grade = '" + grade + "' AND assessmentTypeID in (select assessmentTypeID from"
	       				+ " AssessmentType where assessmentName ='" + assessmentName + "') AND "
	       						+ "studentCourseID in (SELECT studentCourseID FROM StudentCourse WHERE"
	       						+ " grade = 'IP' and userID = '" + userID + "' and courseInfoID in "
	       								+ "(select courseInfoID	from CourseInfo	where"
	       								+ " courseID = '" + courseID + "')) limit 1");
		
	       try{
	    	   int count = st.executeUpdate();
	    	   if (count > 0){
	    		   assessmentRemoved ="true";
	    	   } else {
	    		   assessmentRemoved ="false";
	    	   }
	         
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
    
	   		
	   			return assessmentRemoved;
	   		
	   
	}
	
	public String AddAssessmentGrade (String userID,String courseID,String assessmentName, String grade)
			throws ClassNotFoundException, SQLException{
		 
	     String assessmentAdded="false";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("INSERT into Assessment (assessmentTypeID, grade, studentCourseID) VALUES "
	       		+ "((select assessmentTypeID FROM AssessmentType WHERE StudentCourseID in (SELECT studentCourseID FROM "
	       		+ "StudentCourse WHERE grade = 'IP' and userID ='" + userID + "' AND courseInfoID in "
	       				+ "(select courseInfoID FROM CourseInfo WHERE courseID = '" + courseID + "')) AND"
	       						+ " assessmentName = '" + assessmentName + "'), '" + grade + "', "
	       								+ "(SELECT studentCourseID FROM StudentCourse WHERE grade = 'IP' and"
	       								+ " userID = '" + userID + "' AND courseInfoID in (select courseInfoID FROM "
	       										+ "CourseInfo WHERE courseID ='" + courseID + "')))");
	       try{
	    	   int count = st.executeUpdate();
	    	   if (count > 0){
	    		   assessmentAdded ="true";
	    	   } else {
	    		   assessmentAdded="false";
	    	   }
	         
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
    
	   		
	   			return assessmentAdded;
	   		
	   
	}
	
	
	

}


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CourseAssessments {
	
	public String GetGrade(String Assessment, String userID,String courseID)throws ClassNotFoundException, 
	SQLException{
	
	
		 String avgGrade="";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement(" SELECT AVG(grade) FROM Assessment WHERE assessmentTypeID in (select assessmentTypeID FROM AssessmentType WHERE assessmentName = '"+Assessment+"') AND studentCourseID in (SELECT studentCourseID FROM StudentCourse WHERE grade = 'IP' and userID ='"+userID+"' AND courseInfoID in (select courseInfoID from CourseInfo where courseID ='"+courseID+"'))");
	
	       try{
	           ResultSet r1=st.executeQuery();

	            while(r1.next()) {           	
	               // return avg
	            	avgGrade = r1.getString("AVG(grade)");
	            	
	                }
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }

	       return avgGrade;
	       
	}
	
	public String GetAssessments (String courseID, String userID) throws ClassNotFoundException, SQLException{
		 
	     String assessmentGradeArray="";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("SELECT assessmentName, percentage FROM"
	       		+ " AssessmentType WHERE  studentCourseID in (SELECT studentCourseID  FROM StudentCourse "
	       		+ "WHERE grade = 'IP' and userID = '" + userID + "' and courseInfoID in (select courseInfoID FROM CourseInfo "
	       		+ "WHERE courseID = '" + courseID + "'))");
		
	       try{
	           ResultSet r1=st.executeQuery();

	            while(r1.next()) {           	
	               // make a string that looks like : Quizzes!!70&&Exams!!80&&
	            	String assessment = r1.getString("assessmentName");
	            	String thisGrade = GetGrade(assessment,userID, courseID);
	            	assessmentGradeArray = assessmentGradeArray + assessment;
	            	assessmentGradeArray = assessmentGradeArray + "!!";
	            	assessmentGradeArray = assessmentGradeArray + thisGrade;
	            	assessmentGradeArray = assessmentGradeArray +"&&";
	                }
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
     
	   		
	   			return  assessmentGradeArray;
	   		
	   
	

	}
	
}

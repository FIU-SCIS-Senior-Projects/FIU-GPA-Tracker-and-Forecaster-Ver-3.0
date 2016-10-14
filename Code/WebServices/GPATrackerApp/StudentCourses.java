import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentCourses {
	
	public String GetCourses (String userID) throws ClassNotFoundException, SQLException{
		 
	     String courseGradeArray="";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("select courseID, courseName from CourseInfo where courseInfoID in (select courseInfoID From StudentCourse Where userID ='" + userID + "' and grade = 'IP')");
		
	       try{
	           ResultSet r1=st.executeQuery();

	            while(r1.next()) {

	               // make a string that looks like : COP2210!!Programming I&&MAC2311!!Calculus I
	                courseGradeArray = courseGradeArray + r1.getString("courseID");
	                courseGradeArray = courseGradeArray + "!!";
	                courseGradeArray = courseGradeArray + r1.getString("courseName");
	                courseGradeArray = courseGradeArray +"&&";
	                }
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
      
	   		
	   			return  courseGradeArray;
	   		
	   
	}
	

}


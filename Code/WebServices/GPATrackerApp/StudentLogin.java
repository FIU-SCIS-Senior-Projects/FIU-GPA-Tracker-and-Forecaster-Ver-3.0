import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class StudentLogin  {
	
	public String Login (String userName,String password) throws ClassNotFoundException, SQLException{
		 String loginAccess = "";
	     String courseGradeArray="";
	       Class.forName("com.mysql.jdbc.Driver");

	       Connection con = DriverManager.getConnection("jdbc:mysql://localhost/GPA_Tracker?"
	                 + "user=root&password=sqliscool");
	       PreparedStatement st = con.prepareStatement("select userName, userID from Users where userName='" + userName + "' and password = '"+password+"'");
		
	       try{
	           ResultSet r1=st.executeQuery();

	            while(r1.next()) {

	               
	                courseGradeArray = courseGradeArray + r1.getString("userName");
	                loginAccess = loginAccess + r1.getString("userID");
	                }
	            }
	            catch (Exception e)
	            {
	                System.out.println(e.toString());
	            }
       
	   		if(courseGradeArray.equals(userName)){
	   			return loginAccess;
	   		}else
	   			loginAccess = "false";
	       
	       
	       return loginAccess;
	   
	}

}


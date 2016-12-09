package com.example.pillo.myapplication;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.res.TypedArrayUtils;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.common.api.GoogleApiClient;


import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;  //JH added new
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import java.util.ArrayList;
import java.util.Arrays;

public class MainActivity extends AppCompatActivity {

    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    private GoogleApiClient client;
    private int userID;
    private String courseID;
    String assessmentType;
    private String user;
    private ListView gradeList;
    private ArrayAdapter<String> gradeAdapter;
    private ArrayList<String> grades;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();

        setupMessageButton();
    }

    private void setupMessageButton() {

        Button messageButton = (Button) findViewById(R.id.button);

        //.makeText(MainActivity.this, password, Toast.LENGTH_LONG).show();

        // 2. Set onclick listener
        messageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText userText = (EditText) findViewById(R.id.usernameText);
                EditText passText = (EditText) findViewById(R.id.passwordText);
                String username = userText.getText().toString();
                String password = passText.getText().toString();
                Log.i("Button", "Testing button click event!");


                try {
                    /*
                    String TAG = "JuanWebService";
                    String METHOD_NAME = "Login"; // our webservice method name
                    String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
                    String SOAP_ACTION = "http://ws.apache.org/axis2/Login"; // NAMESPACE + method name
                    String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/StudentLogin?wsdl"; // you must use ipaddress here, don’t use Hostname or localhost
                    */
                    String TAG = "JuanWebService";
                    String METHOD_NAME = "Login"; // our webservice method name
                    String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
                    String SOAP_ACTION = "http://ws.apache.org/axis2/Login"; // NAMESPACE + method name
                    String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/StudentLogin?wsdl"; // you must use ipaddress here, don’t use Hostname or localhost

                    //Testing for ListView in courses page.

                    //Toast.makeText(MainActivity.this,"Edit Text is: " + myEntry.getText().toString(),Toast.LENGTH_LONG).show();
                    Log.i(TAG, "Inside try!");
                    SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
                    request.addProperty("userName", username);
                    request.addProperty("password", password);


                    Log.i(TAG, "after soap object request creation!");
                    SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
                    Log.i(TAG, "after soap serialization envelope creation!");
                    envelope.dotNet = true;
                    envelope.setOutputSoapObject(request);
                    Log.i(TAG, "after envelope.setOutputSoapObject!");
                    HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
                    Log.i(TAG, "after HttpTransportSe!");
                    androidHttpTransport.call(SOAP_ACTION, envelope);
                    Log.i(TAG, "after HttpTransportSE call!");
                    Object result = envelope.getResponse();

                    Log.i(TAG, "result is:" + result.toString());

                    //Toast.makeText(MainActivity.this,"Response is: " + result.toString(),Toast.LENGTH_LONG).show();

                    try{
                        userID = Integer.parseInt(result.toString());
                        createAllCoursesPage(result.toString(), username);
                    }
                    catch (Exception e){
                        Toast.makeText(MainActivity.this, "Invalid username or password.", Toast.LENGTH_LONG).show();
                    }
                    /*
                    //ImageView myimg = (ImageView) findViewById(R.id.imageView);
                    if (result.toString().equals("true")) {
                        createAllCoursesPage(result.toString(), username);
                    } else {
                        Toast.makeText(MainActivity.this, "Invalid username or password.", Toast.LENGTH_LONG).show();
                    }
                    */
                } catch (Exception e) {
                    e.printStackTrace();
                }


            }
        });
    }

    private void createAllCoursesPage(String s, String username){
        userID = Integer.parseInt(s);
        user = username;
        /*
        String TAG = "JuanGetCourses";
        String METHOD_NAME = "GetCourses"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetCourses"; // NAMESPACE + method name
        String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/StudentCourses?wsdl"; // you must use ipaddress here, don’t use Hostname or localhost
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        request.addProperty("userID", userID);
        */
        String TAG = "JuanGetCourses";
        String METHOD_NAME = "GetCourses"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetCourses"; // NAMESPACE + method name
        String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/StudentCourses?wsdl"; // you must use ipaddress here, don’t use Hostname or localhost
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        request.addProperty("userID", userID);

        try {
            Log.i(TAG, "after soap object request creation!");
            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
            Log.i(TAG, "after soap serialization envelope creation!");
            envelope.dotNet = true;
            envelope.setOutputSoapObject(request);
            Log.i(TAG, "after envelope.setOutputSoapObject!");
            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
            Log.i(TAG, "after HttpTransportSe!");
            androidHttpTransport.call(SOAP_ACTION, envelope);
            Log.i(TAG, "after HttpTransportSE call!");
            Object result = envelope.getResponse();
            Log.i(TAG, result.toString());

            if(result.toString().equals("anyType{}"))
                result = "No Courses";
            String coursesData = result.toString();
            coursesData = coursesData.replace("!!", " ");
            String[] courses = coursesData.split("&&");
            setContentView(R.layout.current_courses);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);
            ListView listView = (ListView) findViewById(R.id.currCourse);
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, android.R.id.text1, courses);
            listView.setAdapter(adapter);

            if(!result.toString().equals("No Courses")) {
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                    @Override
                    public void onItemClick(AdapterView<?> parent, View view,
                                            int position, long id) {
                        // ListView Clicked item value
                        String itemValue = (String) parent.getItemAtPosition(position);
                        courseID = itemValue.split(" ")[0];

                        createCoursePage();
                    }

                });
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    private void createCoursePage()
    {
        // Show Alert
        /*
        String TAG = "JuanAssessmentsTypes";
        String METHOD_NAME = "GetAssessments"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetAssessments"; // NAMESPACE + method name
        String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/CourseAssessments?wsdl"; // you must use ipaddress here, don’t use Hostname or localhost
        */
        String TAG = "JuanAssessmentsTypes";
        String METHOD_NAME = "GetAssessments"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetAssessments"; // NAMESPACE + method name
        String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/CourseAssessments?wsdl";

        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        request.addProperty("courseID", courseID);
        request.addProperty("userID", userID);

        try {
            Log.i(TAG, "after soap object request creation!");
            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
            Log.i(TAG, "after soap serialization envelope creation!");
            envelope.dotNet = true;
            envelope.setOutputSoapObject(request);
            Log.i(TAG, "after envelope.setOutputSoapObject!");
            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
            Log.i(TAG, "after HttpTransportSe!");
            androidHttpTransport.call(SOAP_ACTION, envelope);
            Log.i(TAG, "after HttpTransportSE call!");
            Object result = envelope.getResponse();
            Log.i(TAG, result.toString());
            if(result.toString().equals("anyType{}"))
                result = "No Assessment Types";

            String[] rows = result.toString().split("&&");
            for(int i =0; i<rows.length; i++)
            {
                String[] assessInfo = rows[i].split("!!");
                try{
                    double d = Double.parseDouble(assessInfo[1]);
                    d = Math.round(d * 100);
                    d = d/100;
                    rows[i] = assessInfo[0] + "\t\t" + d;
                }
                catch (Exception e){
                    rows[i] = assessInfo[0] + "\t\t" + assessInfo[1];
                }
            }

            setContentView(R.layout.course_grades);
            TextView title = (TextView) findViewById(R.id.assessmentText);
            title.setText("\nAssessments for " + courseID);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);
            ListView listView = (ListView) findViewById(R.id.course_grades);
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, android.R.id.text1, rows);
            listView.setAdapter(adapter);
            if(!result.toString().equals("No Assessment Types")) {
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view,
                                            int position, long id) {
                        // ListView Clicked item value
                        String itemValue = (String) parent.getItemAtPosition(position);
                        assessmentType = itemValue.split("\t\t")[0];

                        createAssessmentPage();
                    }
                });
            }

            setupCourseBack((Button) findViewById(R.id.BackAssess));
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    public void setupCourseBack(Button back){
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createAllCoursesPage(""+userID, user);
            }
        });
    }

    private void createAssessmentPage()
    {
        /*
        String TAG = "JuanGrades";
        String METHOD_NAME = "GetAssessmentGrades"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetAssessmentGrades"; // NAMESPACE + method name
        String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        */
        String TAG = "JuanGrades";
        String METHOD_NAME = "GetAssessmentGrades"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/GetAssessmentGrades"; // NAMESPACE + method name
        String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);

        request.addProperty("userID", userID);
        request.addProperty("courseID", courseID);
        request.addProperty("assessmentName", assessmentType);

        try {
            Log.i(TAG, "after soap object request creation!");
            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
            Log.i(TAG, "after soap serialization envelope creation!");
            envelope.dotNet = true;
            envelope.setOutputSoapObject(request);
            Log.i(TAG, "after envelope.setOutputSoapObject!");
            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
            Log.i(TAG, "after HttpTransportSe!");
            androidHttpTransport.call(SOAP_ACTION, envelope);
            Log.i(TAG, "after HttpTransportSE call!");
            Object result = envelope.getResponse();
            Log.i(TAG, result.toString());
            if(result.toString().equals("anyType{}")) {
                result = "No grades";
                grades = new ArrayList<>();
                grades.add("No Grades");
            }
            else
            {
                grades = new ArrayList<String>(Arrays.asList(result.toString().split("!!")));
                for (int i = 0; i < grades.size(); i++)
                {
                    grades.set(i, "Grade " + (i+1) + ": " + grades.get(i));
                }
            }



            setContentView(R.layout.assessment_grades);
            TextView text = (TextView) findViewById(R.id.gradesText);
            text.setText("\nGrades for " + assessmentType);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);
            gradeList = (ListView) findViewById(R.id.assessmentGrades);
            gradeAdapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, android.R.id.text1, grades);
            gradeList.setAdapter(gradeAdapter);
            setupAddButton();
            final Context thisContext = this;

            if(!result.toString().equals("No grades")) {
                gradeList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view,
                                            int position, long id) {
                        // ListView Clicked item value
                        String itemValue = (String) parent.getItemAtPosition(position);
                        final String grade = itemValue.split(": ")[1];

                        Log.i("grade", grade);


                        AlertDialog.Builder adb = new AlertDialog.Builder(thisContext);
                        adb.setTitle("Delete?");
                        adb.setMessage("Are you sure you want to delete?");
                        adb.setNegativeButton("Cancel", null);
                        final int positionToBeRemoved = position;
                        adb.setPositiveButton("Ok", new AlertDialog.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                removeGrade(positionToBeRemoved, grade);
                            }
                        });
                        AlertDialog dialog = adb.create();
                        dialog.show();
                    }
                });
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        Button backButton = (Button) findViewById(R.id.assesGradesButton);
        setupAssessBackButton(backButton);
    }

    public void setupAssessBackButton(Button backButton)
    {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createCoursePage();
            }
        });
    }

    private void removeGrade(int position, String grade) {
        /*
        String TAG = "JuanGrades";
        String METHOD_NAME = "RemoveAssessmentGrade"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/RemoveAssessmentGrade"; // NAMESPACE + method name
        String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
        */
        String TAG = "JuanGrades";
        String METHOD_NAME = "RemoveAssessmentGrade"; // our webservice method name
        String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
        String SOAP_ACTION = "http://ws.apache.org/axis2/RemoveAssessmentGrade"; // NAMESPACE + method name
        String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);

        request.addProperty("userID", userID);
        request.addProperty("courseID", courseID);
        request.addProperty("assessmentName", assessmentType);
        request.addProperty("grade", grade);
        try{
            Log.i(TAG, "after soap object request creation!");
            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
            Log.i(TAG, "after soap serialization envelope creation!");
            envelope.dotNet = true;
            envelope.setOutputSoapObject(request);
            Log.i(TAG, "after envelope.setOutputSoapObject!");
            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
            Log.i(TAG, "after HttpTransportSe!");
            androidHttpTransport.call(SOAP_ACTION, envelope);
            Log.i(TAG, "after HttpTransportSE call!");
            Object result = envelope.getResponse();
            Log.i(TAG, result.toString());
            if(result.toString().equals("true"))
            {
                grades.remove(position);
                gradeAdapter.notifyDataSetChanged();
            }
            else
            {
                Toast.makeText(MainActivity.this, "Error in deleting the grade.", Toast.LENGTH_LONG).show();
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public void setupAddButton(){
        Button addButton = (Button) findViewById(R.id.addGrade);
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createSubGradePage();
            }
        });
    }

    public void createSubGradePage()
    {
        setContentView(R.layout.add_grade);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Button addButton = (Button) findViewById(R.id.subGrade);
        Button backButton = (Button) findViewById(R.id.addBack);
        setupAddGradeButton(addButton);
        setupBackGradeButton(backButton);
    }

    private void setupAddGradeButton(Button addButton){
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                String newGrade = ((EditText) findViewById(R.id.gradeValue)).getText().toString();
                String TAG = "JuanAddGrades";
                String METHOD_NAME = "AddAssessmentGrade"; // our webservice method name
                String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
                String SOAP_ACTION = "http://ws.apache.org/axis2/AddAssessmentGrade"; // NAMESPACE + method name
                String URL = "http://jhenaoweb.ddns.net:8080/FIUGPALogin/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
                SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
                */
                String newGrade = ((EditText) findViewById(R.id.gradeValue)).getText().toString();
                String TAG = "JuanAddGrades";
                String METHOD_NAME = "AddAssessmentGrade"; // our webservice method name
                String NAMESPACE = "http://ws.apache.org/axis2"; // Here package name in webservice with reverse order.
                String SOAP_ACTION = "http://ws.apache.org/axis2/AddAssessmentGrade"; // NAMESPACE + method name
                String URL = "http://gpa-dev.cis.fiu.edu:8080/GPATrackerApp/services/AssessmentGrades?wsdl"; // you must use ipaddress here, don’t
                SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);

                request.addProperty("userID", userID);
                request.addProperty("courseID", courseID);
                request.addProperty("assessmentName", assessmentType);
                request.addProperty("grade", newGrade);

                try {
                    Log.i(TAG, "after soap object request creation!");
                    SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
                    Log.i(TAG, "after soap serialization envelope creation!");
                    envelope.dotNet = true;
                    envelope.setOutputSoapObject(request);
                    Log.i(TAG, "after envelope.setOutputSoapObject!");
                    HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
                    Log.i(TAG, "after HttpTransportSe!");
                    androidHttpTransport.call(SOAP_ACTION, envelope);
                    Log.i(TAG, "after HttpTransportSE call!");
                    Object result = envelope.getResponse();
                    Log.i(TAG, result.toString());
                    if (result.toString().equals("true")) {
                        Toast.makeText(MainActivity.this, "Grade entered successfully", Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(MainActivity.this, "Error in adding the grade.", Toast.LENGTH_LONG).show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void setupBackGradeButton(Button backButton){
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createAssessmentPage();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onStart() {
        super.onStart();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client.connect();
        Action viewAction = Action.newAction(
                Action.TYPE_VIEW, // TODO: choose an action type.
                "Main Page", // TODO: Define a title for the content shown.
                // TODO: If you have web page content that matches this app activity's content,
                // make sure this auto-generated web page URL is correct.
                // Otherwise, set the URL to null.
                Uri.parse("http://host/path"),
                // TODO: Make sure this auto-generated app deep link URI is correct.
                Uri.parse("android-app://com.example.pillo.myapplication/http/host/path")
        );
        AppIndex.AppIndexApi.start(client, viewAction);
    }

    @Override
    public void onStop() {
        super.onStop();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        Action viewAction = Action.newAction(
                Action.TYPE_VIEW, // TODO: choose an action type.
                "Main Page", // TODO: Define a title for the content shown.
                // TODO: If you have web page content that matches this app activity's content,
                // make sure this auto-generated web page URL is correct.
                // Otherwise, set the URL to null.
                Uri.parse("http://host/path"),
                // TODO: Make sure this auto-generated app deep link URI is correct.
                Uri.parse("android-app://com.example.pillo.myapplication/http/host/path")
        );
        AppIndex.AppIndexApi.end(client, viewAction);
        client.disconnect();
    }
}

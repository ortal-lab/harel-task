/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;

public class UserDao {
    //path to the existing users.csv file
   String path = "C:\\users.csv";
    Path pathToFile = Paths.get(path);

      // get email and password scane the csv file and return true if email && password matches the request
    public Boolean login(String email, String password) {
        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) {
            String line = br.readLine();
            while (line != null) {
                String[] attributes = line.split(",");
                for (String attribute : attributes) {
                    if (attributes[0].equals(email) && attributes[1].equals(password)) {
                        return true;
                    }
                }
                line = br.readLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(UserDao.class.getName()).log(Level.SEVERE, null, ex);
        } 
        return false;
    }

}

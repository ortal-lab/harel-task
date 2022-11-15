/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import dao.Customer;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class CustomerDao {
    
    //path to the existing customers.csv file
    String path = "C:\\customers.csv";
    Path pathToFile = Paths.get(path);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    // get id param and scane the csv file to find the customer
    public Customer getCustomerById(String id) {
        Customer customer = null;

        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) {
            String line = br.readLine();
            while (line != null) {
                String[] attributes = line.split(",");
                for (String attribute : attributes) {
                    if (attributes[0].equals(id)) {
                        customer = new Customer(attributes[0], attributes[1], attributes[2], sdf.parse(attributes[4]), attributes[3], attributes[5]);
                    }
                }
                line = br.readLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(CustomerDao.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(CustomerDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return customer;
    }
    // edit a customer by finding in all customers remove it an rewrite the customer
    public void edit(String id, Customer customer) {
        System.out.println("in edit");
        List<Customer> customers = getCustomers();
        customers.removeIf(c -> c.getId().equals(id));
        customers.add(customer);
        try (BufferedWriter bw = Files.newBufferedWriter(pathToFile, StandardCharsets.US_ASCII)) {
            for (Customer cust : customers) {
                System.out.println("go to write: " + cust);
                bw.write(cust.getId() + "," + cust.getFirstName() + "," + cust.getLastName() + "," + cust.getPhone() + "," + sdf.format(cust.getDate()) + "," + cust.getAccountNumber());
                bw.newLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(CustomerDao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    // when called reads all csv file and return a list type of Customer
    public List<Customer> getCustomers() {
        List<Customer> list = new ArrayList<>();
        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) {
            String line = br.readLine();
            while (line != null) {
                String[] attributes = line.split(",");
                list.add(new Customer(attributes[0], attributes[1], attributes[2], sdf.parse(attributes[4]), attributes[3], attributes[5]));
                line = br.readLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(CustomerDao.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(CustomerDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }
}

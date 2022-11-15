/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import dao.Customer;
import dao.CustomerDao;
import java.util.List;

public class CustomerService {

    CustomerDao customerDao = new CustomerDao();

    public Customer getCustomerById(String id) {
        return customerDao.getCustomerById(id);

    }

    public List<Customer> getCustomers() {
        return customerDao.getCustomers();

    }

    public void edit(String id, Customer customer) {
        customerDao.edit(id, customer);

    }

}

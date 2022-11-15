/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package contollers;

import dao.Customer;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import services.CustomerService;

/**
 *
 * @author user1
 */
@Path("/customer")

public class CustomersController {
    
    CustomerService customerService = new CustomerService();
    // whene called it returns a lits of customers 
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Customer> getCustomers() {     
        System.out.println(customerService.getCustomers());
        return customerService.getCustomers();
    }
    // get a param id and return a specific customer that matches the id
    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomerById(@PathParam("id") String id) {
        Customer customer = customerService.getCustomerById(id);
        return Response.ok(customer).build();
    }
    //get param id and customer and update the specsific customer
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response edit(@PathParam("id") String id, Customer customer) {
        System.out.println(customer);
        customerService.edit(id, customer);
        return Response.ok().build();
    }
}

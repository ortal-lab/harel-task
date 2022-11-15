/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package contollers;

import java.util.regex.Pattern;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import services.UserService;

@Path("/user")
public class UserController {

    UserService userService = new UserService();
    // get email and password validate and return true id found a user else return false
    @GET
    @Path("/login/{email}/{password}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("email") String email, @PathParam("password") String password) {
        email=email.toLowerCase();
        Pattern patternEmail= Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
        Pattern patternPassword= Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        if (!patternEmail.matcher(email).matches() || !patternPassword.matcher(password).matches()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } else {
            Boolean isLogin = userService.login(email, password);
            if (isLogin) {
                return Response.ok().build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

        }
    }

}

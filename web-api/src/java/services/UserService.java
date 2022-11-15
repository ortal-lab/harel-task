/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import dao.UserDao;

public class UserService {

    UserDao userDao = new UserDao();

    public Boolean login(String email, String password) {
        return userDao.login(email,password);

    }

}

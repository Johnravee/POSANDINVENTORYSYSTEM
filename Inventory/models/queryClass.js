const conn = require("../connections/milkteamanagementDB");

class queryMethods{
         insertQuery(tableName, columnName, placeholders, requestBody){
         try {
        const sql = `INSERT INTO ${tableName} (${columnName}) VALUES (${placeholders})`;
             conn.query(sql, requestBody);
             return  true;
    } catch (error) {
        console.error("inserting error",error);
        return false
    }
    }


       async selectQuery(tableName, whereColumnName, columnValues, inValues) {
    try {
          if(inValues){
            const sql = `SELECT * FROM ${tableName} WHERE ${whereColumnName} IN (${columnValues})`;
            
           return await  new Promise((resolve, reject)=>{
                conn.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        console.log(results);
                        resolve(results)
                    }
                });
            });
        }  else if (whereColumnName && columnValues) {
            const sql = `SELECT * FROM ${tableName} WHERE ${whereColumnName} = ? `;
           return await  new Promise((resolve, reject)=>{
                conn.query(sql, [columnValues], (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                      
                        resolve(results)
                        
                    }
                });
            });  
        } else if (tableName && whereColumnName) {
            const sql = `SELECT * FROM ${tableName}`;
           return await new Promise((resolve, reject)=>{
                 conn.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        
                        resolve(results)
                        return results
                    }
                });
            });
        } 
        
    } catch (error) {
        console.error(error);
        throw error;
    }


       }


       async getTotalEmployees(){
        const sql = 'SELECT COUNT(*) AS totalAccounts FROM company_accounts';
        return await new Promise((resolve, reject)=>{
           conn.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        resolve(results)
                    }
                });
        })

   
       }
       

       updateProductPriceANDStocks( newPrice, newStocks, productid){
        try{
            const sql = `UPDATE pos_products SET product_price = ? , product_stocks = ? WHERE id = ?`;
            
            conn.query(sql, [newPrice, newStocks, productid]);
            return true;
        }catch(error){
            console.error("updating price and stocks error", error);
            return false;
        }
    }

        deleteQuery(tablename, id){
           try {
                 const sql = `DELETE FROM ${tablename} WHERE id = ?`;
                 conn.query(sql, [id]);
                 return true;
           } catch (error) {
                console.error("Deleting error", error);
                return false;
           }
        }
       

        updateAdministratorInfo(formdata){
            try {
                const sql = `UPDATE company_accounts SET fullname = ?, job_position = ?, email = ?, contact_number = ?, address = ? WHERE id = ?`;
                conn.query(sql, [formdata.adminfullname, formdata.job_position, formdata.email, formdata.contact, formdata.address, formdata.adminId]);
                return true;
            } catch (error) {
                console.error("Updating error", error);
                return false;
            }
        
        }


        updateEmployeeInfo(formdata){
            try {
                const sql = `UPDATE company_accounts SET fullname = ?,  contact_number = ? WHERE id = ?`;
                conn.query(sql, [formdata.fullname, formdata.contact, formdata.employeeid]);
                return true;
            } catch (error) {
                console.error("Updating error", error);
                return false;
            }
        
        }


        updateProfile(formdata){
            

            const {modalProfileID, modalFullname, modalEmail, modalContact, modalBirthdate, address} = formdata;

            const sql = "UPDATE company_accounts SET fullname = ?, email = ?, contact_number = ?, dateofbirth = ?, address = ? WHERE id = ?";

            conn.query(sql, [modalFullname, modalEmail, modalContact, modalBirthdate, address, modalProfileID], (err, result)=>{
                err ? console.error("Updating error", err)  : console.log("Success updating profile");
            })
            return true
        
        }

    }


module.exports = new queryMethods();
var mysql = require('mysql')

REST_ROUTER.prototype.handleRoutes = function (router, pool){
    // For this example just going to make a route under the assumption that we need to get ONE record from our DB
    router.get("/person/:personId", function(req, res){
        var query = `SELECT * FROM person WHERE ?? = ?`
        var table = ["person_id", req.params.personId];
        query = mysql.format(query, table);
        pool.getConnection(function(err, connection){
            connection.query(function(err, results){
                connection.release();
                    if(err){
                        res.json({"error": true, "message": err})
                    }else{
                        res.json({'error': false, 'results': results})
                    }
            })  
        })
    })

    router.post("/person", function(req, res){
        var query  =`INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
        var table = [
            "person",
            "first_name", req.body.first_name,
            "last_name", req.body.last_name,
            "phone_number", req.body.phone_number,
            "email_address", req.body.email_address
        ];
        query = mysql.format(query, table);
        pool.getConnection(function(err, connection){
            connection.query(function(err, result){
                connection.release();
                if(err){
                    res.json({"error": true, 'message': err})
                }else{
                    res.json({'error': false, 'message':'new person created', result})
                }
            })
        })
    })
    // A lot of people use PUT for an edit of a record in a DB I like using patch becuase you can specify the properties you want 
    // or will change and not have to include all the other fields in the body of the request
    router.patch("/person/personId", function(req,res){
        var query = `INSERT INTO ?? (??) VALUES (?)`
        var table = [
            "person",
            "email_address", req.body.email_address
        ];
        query = mysql.format(query, table)
        pool.getConnection(function(err, connection){
            connection.query(function(err, result){
                connection.release();
                if(err){
                    res.json({"error": false, "message":err})
                }else{
                    res.json({"error": true, "result": "Person has been successfully edited"})
                }
            })
        })
    })
    router.delete("/person", function(req,res){
        var query = `DELETE FROM ?? WHERE ?? = ?`
        var table = [
            "person",
            "person_id", req.body.person_id
        ];
        query = mysql.format(query, table)
        pool.getConnection(function(err, connection){
            connection.query(function(err, result){
                connection.release();
                if(err){
                    res.json({"error": false, "message":err})
                }else{
                    res.json({"error": true, "result": "Person has been removed"})
                }
            })
        })
    })
}
module.exports = REST_ROUTER
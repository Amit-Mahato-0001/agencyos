const Tenant = require("../models/tenant.model");

const resolveTenant = async (req, res, next) => {
    
    try{
        const tenantId = req.user?.tenantId;

        if(!tenantId){
            return res.status(400).json({ message: "Tenant not found" })
        }

        const tenant = await Tenant.findById(tenantId);

        if(!tenant){
            return res.status(404).json({ message: "Tenant does not exist"})
        }

        req.tenant = tenant;
        req.tenantId = tenant._id;

        next();
        
    } catch(err){
        console.error("TENANT RESOLUTION ERROR:", err.message);
        res.status(500).json({ message: "Tenant resolution failed" });
    }
}

module.exports = resolveTenant;
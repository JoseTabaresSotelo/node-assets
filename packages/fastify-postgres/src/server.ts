import Fastify from 'fastify';
import { app } from './app/app';
import categories from './app/routes/categories/categories';
import customers from './app/routes/customers/customers';
import employees from './app/routes/employees/employees';
import orders from './app/routes/orders/orders';
import products from './app/routes/products/products';
import region from './app/routes/region/region';
import shippers from './app/routes/shippers/shippers';
import suppliers from './app/routes/suppliers/suppliers';
import territories from './app/routes/territories/territories';
import usStates from './app/routes/usStates/usStates';



const buildServer = () => {
    // Instantiate Fastify with some config
    const server = Fastify({
        logger: true,
        ignoreTrailingSlash: true
    });
    
    
    
    // Register your application as a normal plugin.
    server.register(app);
    server.register(categories)
    server.register(customers)
    server.register(employees)
    server.register(orders)
    server.register(products)
    server.register(region)
    server.register(shippers)
    server.register(suppliers)
    server.register(territories)
    server.register(usStates)

    //addHooks coming soon

    return server
}

export default buildServer
const admin = require('firebase-admin');

if (!admin.apps.length) {
    try {
        if (!process.env.FIREBASE_PROJECT_ID ||
            !process.env.FIREBASE_CLIENT_EMAIL ||
            !process.env.FIREBASE_PRIVATE_KEY) {
            throw new Error('Variables de entorno faltantes para Firebase');
        }

        const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n');

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey
            })
        });

        console.log('Firebase Admin inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar Firebase Admin:', error.message);
    }
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const db = admin.firestore();

    try {
        const path = event.path || '';

        // Rutas para usuarios
        if (path.includes('/usuarios')) {
            if (event.httpMethod === 'GET') {
                const { id } = event.queryStringParameters || {};
                if (!id) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'Falta parámetro id del usuario' })
                    };
                }

                const userDoc = await db.collection('usuarios').doc(id).get();

                if (!userDoc.exists) {
                    return {
                        statusCode: 404,
                        headers,
                        body: JSON.stringify({ error: 'Usuario no encontrado' })
                    };
                }

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(userDoc.data())
                };
            }

            if (event.httpMethod === 'POST') {
                const body = JSON.parse(event.body);
                const { id, nombre, correo, contrasena } = body;

                if (!id || !nombre || !correo || !contrasena) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            error: 'Todos los campos del usuario son requeridos: id, nombre, correo, contrasena'
                        })
                    };
                }

                const nuevoUsuario = {
                    id,
                    nombre,
                    correo,
                    contrasena,
                    creado: new Date().toISOString()
                };

                await db.collection('usuarios').doc(id).set(nuevoUsuario);

                return {
                    statusCode: 201,
                    headers,
                    body: JSON.stringify({ mensaje: 'Usuario creado', usuario: nuevoUsuario })
                };
            }
        }

        // Rutas para productos
        if (path.includes('/productos')) {
            if (event.httpMethod === 'GET') {
                const { id } = event.queryStringParameters || {};
                if (!id) {
                    const snapshot = await db.collection('productos').get();
                    const productos = snapshot.docs.map(doc => doc.data());
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(productos)
                    };
                }

                const prodDoc = await db.collection('productos').doc(id).get();

                if (!prodDoc.exists) {
                    return {
                        statusCode: 404,
                        headers,
                        body: JSON.stringify({ error: 'Producto no encontrado' })
                    };
                }

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(prodDoc.data())
                };
            }

            if (event.httpMethod === 'POST') {
                const body = JSON.parse(event.body);
                const { id, nombre, precio, imagen } = body;

                if (!id || !nombre || !precio || !imagen) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            error: 'Todos los campos del producto son requeridos: id, nombre, precio, imagen'
                        })
                    };
                }

                const nuevoProducto = {
                    id,
                    nombre,
                    precio,
                    imagen,
                    creado: new Date().toISOString()
                };

                await db.collection('productos').doc(id).set(nuevoProducto);

                return {
                    statusCode: 201,
                    headers,
                    body: JSON.stringify({ mensaje: 'Producto creado', producto: nuevoProducto })
                };
            }
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Ruta o método no permitido' })
        };

    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};

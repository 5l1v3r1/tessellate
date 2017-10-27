/// <reference types="jest" />

import supertest = require('supertest');
import { Problem } from '../src/error';
import TessellateServer from '../src/TessellateServer';

describe('TessellateServer', () => {
  let serverDelegate: TessellateServer;

  afterEach(async () => serverDelegate.stop());

  async function startServer(server: TessellateServer) {
    server = serverDelegate = await server.start(3001, 3002);
    const appRequest = supertest.agent(server.appServer);
    const metricsRequest = supertest.agent(server.metricsServer);
    return { server, appRequest, metricsRequest };
  }

  it('should support a simple route', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());
    server.router.get('/', ctx => (ctx.body = 'Hello, test!'));

    await appRequest
      .get('/')
      .expect(200)
      .expect('Hello, test!');
  });

  it('should return metrics', async () => {
    const { metricsRequest } = await startServer(new TessellateServer());

    await metricsRequest
      .get('/metrics')
      .expect(200)
      .expect('Content-Type', /^text\/plain/);
  });

  it('should use additional middleware', async () => {
    const server = new TessellateServer();
    let middlewareWasCalled = false;
    server.use((ctx, next) => {
      middlewareWasCalled = true;
      ctx.body = 'NOPE';
      return next();
    });

    const { appRequest } = await startServer(server);
    server.router.get('/', ctx => (ctx.body = 'OK'));

    expect(middlewareWasCalled).toBe(false);

    await appRequest
      .get('/')
      .expect(200)
      .expect('OK');

    expect(middlewareWasCalled).toBe(true);
  });

  it('should use additional middleware after the server was started', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());
    server.router.get('/', ctx => (ctx.body = 'OK'));

    let middlewareWasCalled = false;

    await appRequest
      .get('/')
      .expect(200)
      .expect('OK');

    expect(middlewareWasCalled).toBe(false);

    server.use((ctx, next) => {
      middlewareWasCalled = true;
      ctx.body = 'NOPE';
      return next();
    });

    expect(middlewareWasCalled).toBe(false);

    await appRequest
      .get('/')
      .expect(200)
      .expect('OK');

    expect(middlewareWasCalled).toBe(true);
  });

  it('should use deferred middleware', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());
    server.router.get('/', ctx => (ctx.body = 'NOPE :('));

    server.use(async ctx => {
      ctx.body = 'YAY :)';
    }, true);

    await appRequest
      .get('/')
      .expect(200)
      .expect('YAY :)');
  });

  it('should handle Errors', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());

    server.use(async () => {
      throw new Error('Oops!');
    });

    const { body } = await appRequest
      .get('/')
      .expect(500)
      .expect('Content-Type', /^application\/json/);

    expect(body.title).toBe('Error');
    expect(body.detail).toBe('Oops!');
    expect(body.status).toBe(500);
  });

  it('should handle Problems', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());

    server.use(async () => {
      throw new Problem({
        title: 'A Problem',
        detail: 'This is a problem.',
        status: 502
      });
    });

    const { body } = await appRequest
      .get('/')
      .expect(502)
      .expect('Content-Type', /^application\/json/);

    expect(body.title).toBe('A Problem');
    expect(body.detail).toBe('This is a problem.');
    expect(body.status).toBe(502);
  });

  it('should parse JSON request payloads', async () => {
    const { server, appRequest } = await startServer(new TessellateServer());
    const payload = { foo: 'bar' };
    let body;

    server.router.post('/', ctx => {
      body = ctx.request.body;
      ctx.body = 'OK';
    });

    await appRequest
      .post('/')
      .send(payload)
      .expect('OK');

    expect(body).toEqual(payload);
  });
});
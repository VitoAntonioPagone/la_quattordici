from flask import Flask

def create_app():
    app = Flask(__name__)

    # importa e registra i blueprint
    from app.routes.routes import main_bp, routes
    from app.routes.calendar import calendar_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(routes)      
    app.register_blueprint(calendar_bp)

    return app

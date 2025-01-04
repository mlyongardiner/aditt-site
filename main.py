import logging
import os
from flask import Flask, render_template, send_from_directory

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Production configuration
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 31536000  # 1 year for production
app.config['TEMPLATES_AUTO_RELOAD'] = False

@app.route('/')
def index():
    try:
        logger.info("Rendering index page")
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index page: {str(e)}")
        return f"Error: {str(e)}", 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    try:
        logger.info(f"Serving static file: {filename}")
        return send_from_directory('static', filename)
    except Exception as e:
        logger.error(f"Error serving static file {filename}: {str(e)}")
        return f"Error serving static file: {str(e)}", 404

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    logger.error(f"Page not found: {str(e)}")
    return "Page not found", 404

@app.errorhandler(500)
def internal_server_error(e):
    logger.error(f"Server error: {str(e)}")
    return "Internal server error", 500

if __name__ == "__main__":
    try:
        # Get port from environment variable or use default
        port = int(os.environ.get('PORT', 3001))
        logger.info(f"Starting Flask application on port {port}")
        app.run(host='0.0.0.0', port=port, threaded=True)
    except Exception as e:
        logger.error(f"Failed to start Flask application: {str(e)}")
        raise
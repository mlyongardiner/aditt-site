from flask import Flask, render_template, send_from_directory
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    logger.info(f"Starting Flask application on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)

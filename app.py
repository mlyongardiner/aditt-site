from flask import Flask, render_template, send_from_directory, request, jsonify
from models import db, WaitlistSubmission
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

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///waitlist.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    try:
        logger.info("Rendering index page")
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index page: {str(e)}")
        return f"Error: {str(e)}", 500

@app.route('/api/waitlist', methods=['POST'])
def submit_waitlist():
    try:
        data = request.json
        submission = WaitlistSubmission(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            phone=data['phone']
        )
        db.session.add(submission)
        db.session.commit()
        return jsonify({'message': 'Successfully joined waitlist!'}), 200
    except Exception as e:
        logger.error(f"Error in waitlist submission: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/static/<path:filename>')
def serve_static(filename):
    try:
        logger.info(f"Serving static file: {filename}")
        return send_from_directory('static', filename)
    except Exception as e:
        logger.error(f"Error serving static file {filename}: {str(e)}")
        return f"Error serving static file: {str(e)}", 404

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'  # Explicitly set host to 0.0.0.0
    logger.info(f"Starting Flask application on host {host} and port {port}")
    app.run(host=host, port=port)
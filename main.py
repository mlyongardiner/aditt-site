import logging
import os
from app import app

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    try:
        # Get port from environment variable or default to 3000
        port = int(os.environ.get('PORT', 3000))
        logger.info(f"Starting Flask application on port {port}")
        # Set debug=False for production deployment
        app.run(host="0.0.0.0", port=port, debug=False)
    except Exception as e:
        logger.error(f"Failed to start Flask application: {str(e)}")
        raise
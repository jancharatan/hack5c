import uuid


class VisualizationTracker:
    def __init__(self):
        self.visualizationSettings = {}

    def make_key(self):
        key = uuid.uuid4()
        return str(key)[:5]

    def get_visualization(self, key):
        # throw if it's not found lmao
        return self.visualizationSettings[key]

    def save_visualization(self, settings):
        # Find an unused key.
        key = self.make_key()
        while key in self.visualizationSettings:
            key = self.make_key()

        # Save the visualization settings.
        self.visualizationSettings[key] = settings

        # Return the key.
        return key
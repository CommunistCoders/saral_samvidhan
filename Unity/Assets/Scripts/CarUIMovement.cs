using UnityEngine;
using UnityEngine.UI;
// Attached to car
public class CarUIController : MonoBehaviour
{
    public CarMovement carMovement; // Reference to CarMovement script

    public Button forwardButton;
    public Button backwardButton;
    public Button leftButton;
    public Button rightButton;

    private bool isMovingForward = false;
    private bool isMovingBackward = false;
    private bool isRotatingLeft = false;
    private bool isRotatingRight = false;

    void Start()
    {
        // Add listeners for button press and release events
        forwardButton.onClick.AddListener(() => OnMoveButtonPressed("forward"));
        backwardButton.onClick.AddListener(() => OnMoveButtonPressed("backward"));
        leftButton.onClick.AddListener(() => OnRotateButtonPressed("left"));
        rightButton.onClick.AddListener(() => OnRotateButtonPressed("right"));

        // For holding down the buttons
        forwardButton.onClick.AddListener(() => isMovingForward = true);
        backwardButton.onClick.AddListener(() => isMovingBackward = true);
        leftButton.onClick.AddListener(() => isRotatingLeft = true);
        rightButton.onClick.AddListener(() => isRotatingRight = true);
    }

    void Update()
    {
        if (isMovingForward)
        {
            carMovement.Move(10);
            isMovingForward = false;
        }
        if (isMovingBackward)
        {
            carMovement.Move(-10);
            isMovingBackward = false;
        }
        if (isRotatingLeft)
        {
            carMovement.Rotate(-10);
            isRotatingLeft = false;
        }
        if (isRotatingRight)
        {
            carMovement.Rotate(10);
            isRotatingRight = false;
        }
    }

    void OnMoveButtonPressed(string direction)
    {
        switch (direction)
        {
            case "forward":
                isMovingForward = true;
                break;
            case "backward":
                isMovingBackward = true;
                break;
        }
    }

    void OnRotateButtonPressed(string direction)
    {
        switch (direction)
        {
            case "left":
                isRotatingLeft = true;
                break;
            case "right":
                isRotatingRight = true;
                break;
        }
    }

    public void OnMoveButtonReleased()
    {
        isMovingForward = false;
        isMovingBackward = false;
        isRotatingLeft = false;
        isRotatingRight = false;
    }

}

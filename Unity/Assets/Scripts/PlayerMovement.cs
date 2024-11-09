using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerMovement : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float rotationSpeed = 100f;
    private Animator animator;
    private Rigidbody rb;
    bool canMove = true;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        // Handle movement and rotation
        if (canMove)
        {
            MovePlayer();
        }
        RotatePlayer();
    }

    void MovePlayer()
    {
        Vector3 moveDirection = Vector3.zero;

        // Forward movement with W (negative world Y)
        if (Input.GetKey(KeyCode.W))
        {
            moveDirection += new Vector3(0, 1, 0); // Moving forward in world space
        }
        // Backward movement with S (positive world Y)
        else if (Input.GetKey(KeyCode.S))
        {
            moveDirection += new Vector3(0, -1, 0); // Moving backward in world space
        }

        // Convert local movement to world movement based on player's orientation
        if (moveDirection != Vector3.zero)
        {
            Vector3 worldMoveDirection = transform.TransformDirection(moveDirection);
            rb.MovePosition(rb.position + worldMoveDirection * moveSpeed * Time.deltaTime);
            animator.SetBool("isWalking", true); // Set walking animation
        }
        else
        {
            animator.SetBool("isWalking", false); // Stop walking animation
        }
    }

    void RotatePlayer()
    {
        float rotationInput = 0;

        if (Input.GetKey(KeyCode.A))
        {
            rotationInput = -1; // Rotate left
        }
        else if (Input.GetKey(KeyCode.D))
        {
            rotationInput = 1; // Rotate right
        }

        if (rotationInput != 0)
        {
            // Apply torque for smooth rotation
            Vector3 torque = new Vector3(0, rotationInput * rotationSpeed, 0);
            rb.AddTorque(torque * Time.deltaTime, ForceMode.VelocityChange);
        }
    }
    void OnCollisionEnter(Collision collision)
    {
        // Prevent movement when colliding with any object
        canMove = false;
        if (collision.gameObject.CompareTag("car")) // Check if collided with car
        {
            var carMovement = collision.gameObject.GetComponent<CarMovement>();
            if (carMovement != null) // Check if CarMovement is found
            {
                carMovement.EnableControls(); // Enable car control
                gameObject.SetActive(false); // Hide the player object
                canMove = true;
            }
            else
            {
                Debug.LogError("CarMovement component not found on the car GameObject.");
            }
        }
    }

    void OnCollisionExit(Collision collision)
    {
        // Allow movement again when not colliding
        canMove = true;
        rb.linearVelocity = Vector3.zero;
        rb.angularVelocity = Vector3.zero;

    }

}
